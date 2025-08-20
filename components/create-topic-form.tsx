import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@heroui/react";
import * as actions from '@/actions'
import { Plus } from "lucide-react";
import { useActionState } from "react";
import FormButton from "./form-button";

const CreateTopicForm = () => {
  const [state, action] = useActionState(actions.createTopic, { error: {} })

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">
          <span>Create new topik</span>
          <Plus />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px]">
        <form action={action} className="p-2">
          <Input
            name="name"
            label='Title'
            labelPlacement="outside"
            placeholder="Title"
            isInvalid={!!state.error.name}
            errorMessage={state.error.name?.join(', ')}
          />

          <Textarea
            name="description"
            label='Description'
            labelPlacement="outside"
            placeholder="Description"
            className="mt-2"
            isInvalid={!!state.error.description}
            errorMessage={state.error.description?.join(', ')}
          />

          {/* <Button type="submit" className="mt-4">Create topic</Button> */}
          <FormButton>Create topic</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  )
}


export default CreateTopicForm;