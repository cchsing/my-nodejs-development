const pino = require('pino');
const logger = pino();

let iteration = 0;

logger.info('Initiating raw JSON log generation loop...');

const logInterval = setInterval(() => {
  iteration++;

  if (iteration % 5 === 0) {
    logger.warn({ iteration, status: 'DEGRADED' }, `Warning trace emitted at loop count ${iteration}`);
  } else if (iteration % 10 === 0) {
    // Passing error details inside structured fields
    logger.error({ 
      iteration, 
      error: { message: 'Database timeout simulation', code: 'ETIMEDOUT' } 
    }, 'Execution failed');
  } else {
    logger.info({ iteration, health: 'OK' }, `Container heartbeat check - Iteration: ${iteration}`);
  }

  if (iteration >= 86400) {
    logger.info('🏁 Target threshold reached. Shutting down loop execution.');
    clearInterval(logInterval);
  }
}, 1000);
