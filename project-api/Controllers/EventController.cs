using System.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.CompilerServices;
using project.api.Dtos;
using project.domain;
using project.repository;

namespace project.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly iEventRepository _eventRepository;
        private readonly iProjectRepository _projectRepository;
        private readonly IMapper _mapper;

        public EventController(iEventRepository eventRepository, iProjectRepository projectRepository, IMapper mapper)
        {
            _eventRepository = eventRepository;
            _projectRepository = projectRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var _events = await _eventRepository.GetAllEventAsync(true);

                var results = _mapper.Map<EventDto[]>(_events);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou {ex.Message}");
            }
        }

        [HttpGet("{EventId}")]
        public async Task<IActionResult> Get(int EventId)
        {
            try
            {
                var _event = await _eventRepository.GetEventAsyncById(EventId, true);

                var results = _mapper.Map<EventDto>(_event);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
            }
        }

        [HttpGet("getByTheme/{theme}")]
        public async Task<IActionResult> Get(string theme)
        {
            try
            {
                var _events = await _eventRepository.GetAllEventAsyncByTheme(theme, true);

                var results = _mapper.Map<Event[]>(_events);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou {ex.Message}");
            }
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folder = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folder);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                    var fullPath = Path.Combine(pathToSave, fileName.Replace("\"", " ").Trim());
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
                return Ok();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou {ex.Message}");
            }
            return BadRequest("Erro ao tentar realizar upload");
        }

        [HttpPost]
        public async Task<IActionResult> Post(EventDto eventDto)
        {
            try
            {
                var _event = _mapper.Map<Event>(eventDto);

                _projectRepository.Add(_event);

                if (await _projectRepository.SaveChangesAsync())
                {
                    return Created($"/api/event/{eventDto.Id}", _mapper.Map<EventDto>(_event));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou, {ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("{EventId}")]
        public async Task<IActionResult> Put(int EventId, EventDto eventDto)
        {
            try
            {
                var _event = await _eventRepository.GetEventAsyncById(EventId, false);

                if (_event == null)
                {
                    return NotFound();
                }

                var idLots = new List<int>();
                var idSocialNetworks = new List<int>();

                eventDto.Lots.ForEach(item => idLots.Add(item.Id));
                eventDto.SocialNetworks.ForEach(item => idSocialNetworks.Add(item.Id));

                var lots = _event.Lots
                        .Where(lot => !idLots.Contains(lot.Id))
                        .ToArray();
                var socialNetworks = _event.SocialNetworks
                        .Where(socialNetwork => !idSocialNetworks.Contains(socialNetwork.Id))
                        .ToArray();

                if (lots.Length > 0)
                {
                    _projectRepository.DeleteRange(lots);
                }
                if (socialNetworks.Length > 0)
                {
                    _projectRepository.DeleteRange(socialNetworks);
                }

                _mapper.Map(eventDto, _event);
                _projectRepository.Update(_event);

                if (await _projectRepository.SaveChangesAsync())
                {
                    return Created($"/api/event/{eventDto.Id}", _mapper.Map<EventDto>(_event));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou, {ex.Message}");
            }
            return BadRequest();
        }

        [HttpDelete("{EventId}")]
        public async Task<IActionResult> Delete(int EventId)
        {
            try
            {
                var _event = await _eventRepository.GetEventAsyncById(EventId, false);
                if (_event == null)
                {
                    return NotFound();
                }
                _projectRepository.Delete(_event);
                if (await _projectRepository.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou: {ex.Message}");
            }
            return BadRequest();
        }
    }
}