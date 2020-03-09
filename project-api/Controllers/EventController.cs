using Microsoft.VisualBasic.CompilerServices;
using System;
using System.Diagnostics;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using project.repository.data;
using project.domain;
using project.repository;
using AutoMapper;
using project.api.Dtos;

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

        [HttpPost]
        public async Task<IActionResult> Post(EventDto model)
        {
            try
            {
                var _event = _mapper.Map<Event>(model);

                _projectRepository.Add(_event);

                if (await _projectRepository.SaveChangesAsync())
                {
                    return Created($"/api/event/{model.Id}", _mapper.Map<EventDto>(_event));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou, {ex.Message}");
            }
            return BadRequest();
        }

        [HttpPut("{EventId}")]
        public async Task<IActionResult> Put(int EventId, EventDto model)
        {
            try
            {
                var _event = await _eventRepository.GetEventAsyncById(EventId, false);

                if (_event == null)
                {
                    return NotFound();
                }

                _mapper.Map(model, _event);

                _projectRepository.Update(_event);

                if (await _projectRepository.SaveChangesAsync())
                {
                    return Created($"/api/event/{model.Id}", _mapper.Map<EventDto>(_event));
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