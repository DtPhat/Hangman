interface PictureProps{
    chances: number
}
function Picture({chances}:PictureProps) {
    return (
        <div className="flex justify-center">
            <div className="absolute text-transparent">{chances}</div>
            <img className={`w-64 sm:w-72 h-72 rounded-xl`} src={`./MrIncredible/phase${chances}.jpg`} alt="" width={144}/>
        </div>
    );
}

export default Picture;