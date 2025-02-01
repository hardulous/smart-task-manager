import EditTopicForm from "@/components/editTopicForm";
import axios from "axios";

const getTopic = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/topics/${id}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    if(!res.data){
      throw new Error("Failed To Fetch Topic")
    }
    else{
      return res.data
    }
  } catch (error) {
    console.log(error)
  }
};

const EditTopic = async ({ params }) => {
  const { id } = params;
  const {topic} = await getTopic(id)
  return <EditTopicForm topic={topic}/>;
};

export default EditTopic;
