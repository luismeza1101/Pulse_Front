interface Props {
  content: string
  name: string | null
}

const Comment: React.FC<Props> = ({content, name}) => {
  return (
    <div className="bg-gray-300 p-2 rounded-lg">
        <h3 className="text-base">{name}</h3>
        <p className="text-sm">{content}</p>
    </div>
  )
}

export default Comment
