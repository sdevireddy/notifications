import { FaPhoneSlash, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Download, Mail } from "lucide-react";

const leadInfo = {
  leadOwner: "Michael Scott",
  leadName: "John Doe",
  phone: "+91 98765 43210",
  leadCreated: "2025-03-15",
  leadStatus: "Hot"
};

const callData = [
  { date: "2025-03-29", time: "10:30 AM", type: "Incoming", duration: "5 min", recording: "recording1.mp3" },
  { date: "2025-03-29", time: "2:15 PM", type: "Outgoing", duration: "10 min", recording: "recording2.mp3" },
  { date: "2025-03-28", time: "11:00 AM", type: "Missed", duration: "0s", recording: "recording3.mp3" }
];

const emailData = [
  { date: "2025-03-29", time: "09:00 AM", sender: "Michael Scott", recipient: "John Doe", subject: "Follow-up on Proposal", body: "Hi John, just following up on the proposal. Let me know your thoughts." },
  { date: "2025-03-28", time: "03:45 PM", sender: "John Doe", recipient: "Michael Scott", subject: "Re: Proposal", body: "Hi Michael, I have reviewed the proposal. Can we discuss tomorrow?" }
];

const typeStyles = {
  Incoming: { bg: "bg-green-500", icon: <FaArrowDown /> },
  Outgoing: { bg: "bg-blue-500", icon: <FaArrowUp /> },
  Missed: { bg: "bg-red-500", icon: <FaPhoneSlash /> }
};

const groupedCalls = callData.reduce((acc, call) => {
  if (!acc[call.date]) acc[call.date] = [];
  acc[call.date].push(call);
  return acc;
}, {});

const CallHistory = () => {
  return (
    <div className="p-6 w-full max-w-4xl bg-white shadow rounded-lg">
      <div className="p-4 bg-gray-200 rounded-lg shadow-md mb-6 border border-gray-400">
        <h2 className="text-xl font-bold mb-4">🎯 Lead Information</h2>
        <div className="grid grid-cols-3 gap-4 text-gray-700">
          <p><strong>Lead Owner:</strong> {leadInfo.leadOwner}</p>
          <p><strong>Lead Name:</strong> {leadInfo.leadName}</p>
          <p><strong>Phone:</strong> {leadInfo.phone}</p>
          <p><strong>Lead Created:</strong> {leadInfo.leadCreated}</p>
          <p><strong>Lead Status:</strong> {leadInfo.leadStatus}</p>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">📞 Phone Call Activity</h2>
      <div className="relative border-l-2 border-gray-300 pl-6">
        {Object.keys(groupedCalls).map((date, idx) => (
          <div key={idx} className="relative mb-6">
            <div className="text-lg font-semibold text-gray-700 mb-2 border-l-4 pl-2 border-gray-400">{date}</div>
            {groupedCalls[date].map((call, index) => (
              <div key={index} className="relative mb-4 ml-6">
                <div className={`absolute -left-4 w-8 h-8 flex items-center justify-center rounded-full text-white shadow-md ${typeStyles[call.type].bg}`}>
                  {typeStyles[call.type].icon}
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <p className="text-gray-600 text-sm font-semibold">{call.time}</p>
                  <p className="text-gray-700 text-sm"><strong>Type:</strong> {call.type}</p>
                  <p className="text-gray-700 text-sm"><strong>Duration:</strong> {call.duration}</p>
                  <a href={call.recording} download className="flex items-center text-blue-500 hover:underline mt-2">
                    <Download size={16} className="mr-1" /> Download Recording
                  </a>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <h2 className="text-xl font-bold mt-8 mb-4">📧 Email Communication</h2>
      <div className="relative border-l-2 border-gray-300 pl-6">
        {emailData.map((email, index) => (
          <div key={index} className="relative mb-6 ml-6">
            <div className="absolute -left-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-500 text-white shadow-md">
              <Mail size={16} />
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm font-semibold">{email.date} - {email.time}</p>
              <p className="text-gray-700 text-sm"><strong>From:</strong> {email.sender}</p>
              <p className="text-gray-700 text-sm"><strong>To:</strong> {email.recipient}</p>
              <p className="text-gray-700 text-sm"><strong>Subject:</strong> {email.subject}</p>
              <p className="text-gray-600 text-sm mt-2">{email.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallHistory;
