const openWhatsAppWeb = () => {
  window.open("https://web.whatsapp.com", "_blank", "width=1000,height=800");
};

const WhatsAppChat = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={openWhatsAppWeb}
        className="bg-green-500 text-white px-4 py-2 rounded shadow-lg hover:bg-green-600"
      >
        Open WhatsApp Web
      </button>
    </div>
  );
};

export default WhatsAppChat;
