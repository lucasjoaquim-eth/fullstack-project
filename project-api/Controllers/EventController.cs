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

namespace project.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly iEventRepository _eventRepository;
        private readonly iProjectRepository _projectRepository;

        public EventController(iEventRepository eventRepository, iProjectRepository projectRepository)
        {
            _eventRepository = eventRepository;
            _projectRepository = projectRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _eventRepository.GetAllEventAsync(true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
            }
        }

        [HttpGet("{EventId}")]
        public async Task<IActionResult> Get(int EventId)
        {
            try
            {
                var results = await _eventRepository.GetEventAsyncById(EventId, true);
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
                var results = await _eventRepository.GetAllEventAsyncByTheme(theme, true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Event modelEvent)
        {
            try
            {
                _projectRepository.Add(modelEvent);
                if (await _projectRepository.SaveChangesAsync())
                {
                    return Created($"/api/event/{modelEvent.Id}", modelEvent);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Put(int EventId, Event modelEvent)
        {
            try
            {
                var Event = await _eventRepository.GetEventAsyncById(EventId, false);
                if (Event == null)
                {
                    return NotFound();
                }
                if (await _projectRepository.SaveChangesAsync())
                {
                    return Created($"/api/event/{modelEvent.Id}", modelEvent);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
            }
            return BadRequest();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int EventId, Event modelEvent)
        {
            try
            {
                var Event = await _eventRepository.GetEventAsyncById(EventId, false);
                if (Event == null)
                {
                    return NotFound();
                }
                _projectRepository.delete(Event);
                if (await _projectRepository.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
            }
            return BadRequest();
        }
    }
}