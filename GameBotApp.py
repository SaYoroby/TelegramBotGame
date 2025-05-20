from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# Функция обработки команды /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Привет! Напиши /game чтобы открыть рулетку.")

# Функция обработки команды /game
async def game(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("🎰 Открыть рулетку", web_app=WebAppInfo(url="https://sayoroby.github.io/TelegramBotGame/"))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("Нажми кнопку ниже, чтобы открыть игру:", reply_markup=reply_markup)

# Запуск бота
if __name__ == "__main__":
    app = ApplicationBuilder().token("7411217061:AAEwC4okb5s8VfOg3HhgBYoMEMf3jB4Az4w").build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("game", game))

    print("Бот запущен...")
    app.run_polling()
