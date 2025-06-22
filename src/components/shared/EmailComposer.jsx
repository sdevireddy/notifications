import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


export const EmailComposer = ({ onClose, selectedLeads }) => {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);
    const [selectedmails, setSelectedMails] = useState([]);
    const didMountRef = useRef(false);

    //   console.log(selectedLeads)
    const getMails = () => {
        const mails = selectedLeads?.map((lead) => {
            return {
                mail: lead.email,
                name: lead.firstName + " " + lead.lastName,
                id: lead.id,
            };
        });
        // console.log(mails)
        setSelectedMails(mails);
    };
    useEffect(() => {
        getMails();
        //   console.log(didMountRef)
    }, []);
    const handleSend = () => {
        console.log(body);
        console.log("Sending...");
    };
    const handleRemoveMail = (id) => {
        setSelectedMails((prev) => prev.filter((mail) => mail.id !== id));
    };
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-600/60 p-4">
            <div className="relative flex h-[90vh] w-[80vw] flex-col overflow-hidden rounded bg-white">
                {/* Sticky Heading */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-3">
                    <h2 className="font-semibold">Send Mail</h2>
                    <button
                        onClick={onClose}
                        className="text-lg text-gray-500 hover:text-red-500"
                    >
                        <XIcon />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-3">
                    <div className="flex items-center gap-3">
                        <p>From</p>
                        <p className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1">sfkdsfsfll@gmail.com</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <p>To</p>
                        <div className="flex max-h-28 flex-1 flex-wrap gap-3 overflow-x-scroll rounded border border-gray-400 p-1">
                            {selectedmails?.map((mail, ind) => {
                                return (
                                    <p
                                        className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1"
                                        key={ind}
                                    >
                                        {mail?.mail}
                                        <XIcon
                                            size={15}
                                            onClick={() => handleRemoveMail(mail.id)}
                                            className="cursor-pointer"
                                        />
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    {/* CC and BCC checkboxes */}
                    <div className="flex gap-4">
                        <label className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={showCc}
                                onChange={() => setShowCc(!showCc)}
                            />
                            CC
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={showBcc}
                                onChange={() => setShowBcc(!showBcc)}
                            />
                            BCC
                        </label>
                    </div>

                    {showCc && (
                        <div className="flex items-center gap-3">
                            <p>CC</p>
                            <div className="flex-1 rounded border border-gray-400 p-1">
                                <p className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
                                    sfkdsfsfll@gmail.com <XIcon size={10} />
                                </p>
                            </div>
                        </div>
                    )}

                    {showBcc && (
                        <div className="flex items-center gap-3">
                            <p>BCC</p>
                            <div className="flex-1 rounded border border-gray-400 p-1">
                                <p className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
                                    sfkdsfsfll@gmail.com <XIcon size={10} />
                                </p>
                            </div>
                        </div>
                    )}

                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full border p-2"
                    />

                    <ReactQuill
                        theme="snow"
                        value={body}
                        onChange={setBody}
                        className="custom-quill"
                    />
                </div>

                {/* Sticky Send Button */}
                <div className="sticky bottom-0 border-t bg-white px-5 py-3">
                    <button
                        onClick={handleSend}
                        className="w-full rounded bg-blue-500 p-2 text-white"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
