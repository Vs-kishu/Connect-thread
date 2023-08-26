import Image from "next/image"

interface props{
    accountId:string,
    authUserId:string,
    name:string,
    username:string,
    bio:string,
    imgUrl:string
    
}
const ProfileHeader = ({accountId,authUserId,name,username,bio,imgUrl}:props) => {
  return (
    <div className="flex -w-full flex-col justify-start">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20 object-cover">
                <Image 
                src={imgUrl}
                width={50}
                height={50}
                alt="profile phtoto"
                className="rounded-full object-cover ring-4  ring-white shadow-neutral-50 shadow-md"/>
                </div>

                <div className="flex-1">
                    <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
                    <p className="text-base-medium text-gray-1">{username}</p>
                </div>
            </div>
        </div>
          {/* //todo:reneder community */}
           <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
           <div className="mt-12 h-0.5 w-full bg-dark-3"></div>
    </div>
  )
}

export default ProfileHeader
