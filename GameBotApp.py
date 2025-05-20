from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

BOT_TOKEN = "YOUR_BOT_TOKEN"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Кнопка, которая откроет Web App
    keyboard = [
        [InlineKeyboardButton("🎁 Открыть кейс", web_app=WebAppInfo(url="https://yourdomain.com/lootbox"))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text("Добро пожаловать! Нажмите кнопку ниже, чтобы открыть кейс:", reply_markup=reply_markup)

def main():
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.run_polling()

if __name__ == "__main__":
    main()
