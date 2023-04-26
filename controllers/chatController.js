const db = require("../models");
const Op = db.Sequelize.Op;

// Create a new chat message
exports.createChat = async (req, res) => {
  try {
    const { message, senderId, receiverId } = req.body;
    const chat = await db.Chat.create({ message, senderId, receiverId });
    res.status(201).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the chat message.' });
  }
};

// Get all chat messages between two users
exports.getChats = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    const chats = await db.Chat.findAll({
      where: {
        senderId,
        receiverId
      },
      order: [['createdAt', 'ASC']]
    });
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving the chat messages.' });
  }
};
