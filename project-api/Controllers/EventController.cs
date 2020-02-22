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
        private readonly iEventRepository _repository;

        public EventController(iEventRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repository.GetAllEventAsync(true);
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
                var results = await _repository.GetEventAsyncById(EventId, true);
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
                var results = await _repository.GetAllEventAsyncByTheme(theme, true);
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
                _repository.Add(modelEvent);
                if (await _repository.SaveChangesAsync())
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
                var Event = await _repository.GetEventAsyncById(EventId, false);
                if (Event == null)
                {
                    return NotFound();
                }
                if (await _repository.SaveChangesAsync())
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
                var Event = await _repository.GetEventAsyncById(EventId, false);
                if (Event == null)
                {
                    return NotFound();
                }
                _repository.delete(Event);
                if (await _repository.SaveChangesAsync())
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