const messages = [
  {
    sender: 'user',
    text: 'lococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococ'
  },
  {
    sender: 'friend',
    text: 'siba'
  },
  {
    sender: 'friend',
    text: 'hello~~'
  },
  {
    sender: 'user',
    text: 'I wanna sing a song'
  },
  {
    sender: 'friend',
    text: 'lococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococ'
  },
  {
    sender: 'user',
    text: 'lococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococlococococlclcococ'
  },
]

const image = 'https://i.namu.wiki/i/bGfaCwl_uA56kIIGrjOXGB9ReqjrTvhEU5a7Eh5OtjntdAgg0IoK1Bok1P7M7ps0Gc9eaoGma8bL_A6eXdnFhbnnWY4k94UGzDi3KE_qyhYiT5G8mrS65BKHO3sFCGQwqlkcocdgIZL3VR7ZYsUuag.webp';

export default function Page() {

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <div className="mx-auto max-w-md">
        <div className="border border-gray-100 rounded-lg p-8">
          <div className="flex flex-col gap-5">
            {messages.map((message, index) => (<div className={`flex gap-5 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              {message.sender === 'friend' && <img
                src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=1024x1024&w=is&k=20&c=iGtRKCTRSvPVl3eOIpzzse5SvQFfImkV0TZuFh-74ps="
                className="rounded rounded-full overflow-hidden w-8 h-8" />}
              <div className="bg-gray-100 rounded rounded-e-xl rounded-es-xl p-2">{message.sender}</div>
            </div>))}
          </div>
          <div className="mt-5 relative">
            <input type="text" className="w-full border border-gray rounded-lg p-3" placeholder="Message Friend..." />
            <button className="absolute end-2.5 bottom-2.5 p-1 rounded-md flex item-center bg-purple-500 text-white font-medium px-5">Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}