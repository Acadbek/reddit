'use client'

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from '@heroui/react'
import { Plus } from 'lucide-react'
import { useActionState } from 'react'
import * as actions from '@/actions'

interface CreatePostFormProps {
  slug: string
}

const CreatePostForm = ({ slug }: CreatePostFormProps) => {
  const [data, action] = useActionState(actions.createPost.bind(null, slug), { error: {} })

  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color="primary"><Plus /> Create post</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form action={action} className='flex flex-col gap-3 p-2 w-[400px]'>
          <Input
            name='name'
            label='Post Name'
            labelPlacement='outside'
            placeholder='Post Name'
            isInvalid={!!data.error.name}
            errorMessage={data.error.name?.join(', ')}
          />

          <Textarea
            minRows={80}
            name='content'
            label='Content'
            labelPlacement='outside'
            placeholder='Content...'
            isInvalid={!!data.error.content}
            errorMessage={data.error.content?.join(', ')}
          />

          {data.error._form ? <div className='p-2 rounded-md bg-red-200 border-red-400'>{data.error._form}</div> : null}

          <Button type='submit'>Create post</Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default CreatePostForm