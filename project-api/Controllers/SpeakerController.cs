using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using project.domain;
using project.repository;

namespace project.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpeakerController : ControllerBase
    {
        private readonly iSpeakerRepository _speakerRepository;
        private readonly iProjectRepository _projectRepository;

        public SpeakerController(iSpeakerRepository speakerRepository, iProjectRepository projectRepository)
        {
            _speakerRepository = speakerRepository;
            _projectRepository = projectRepository;
        }

        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _speakerRepository.GetAllSpeakerAsync(true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
            }
        }

        [HttpGet("{SpeakerId}")]
        public async Task<IActionResult> Get(int SpeakerId)
        {
            try
            {
                var results = await _speakerRepository.GetSpeakerAsyncById(SpeakerId, true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados Falhou");
            }
        }


        [HttpGet("getByName/{Name}")]
        public async Task<IActionResult> Get(string name)
        {
            try
            {
                var results = await _speakerRepository.GetAllSpeakerAsyncByName(name, true);
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados Falhou: {ex}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post(Speaker modelSpeaker)
        {
            try
            {
                _projectRepository.Add(modelSpeaker);
                if (await _projectRepository.SaveChangesAsync())
                {
                    return Created($"/api/speaker/{modelSpeaker.Id}", modelSpeaker);
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