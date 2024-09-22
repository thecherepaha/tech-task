import cors from "cors"
import rateLimit from "express-rate-limit"

//CORS CONFIGURATION HERE
const CorsSettings = cors({
  credentials: true,
})

//RATE LIMITING CONFIGURATIONS HERE
const ApiLimiter = rateLimit({
  windowMs: 1000, // 1 секунда
  max: 1, // Лимит запросов
  message: "Too many requests, please try again later.", // Сообщение при превышении лимита
  standardHeaders: true, // Возвращает информацию о лимите в заголовках `RateLimit-*`
  legacyHeaders: false, // Отключаем заголовки `X-RateLimit-*`
})

export { CorsSettings, ApiLimiter }
