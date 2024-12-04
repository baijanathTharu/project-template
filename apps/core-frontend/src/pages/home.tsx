import { Button } from '@nextui-org/button';
import { todoClient } from '../clients/todo-client';
import { qc } from '../app/query';

export function HomePage() {
  const todos = todoClient.getTodos.useQuery(['getTodos']);

  const createTodo = todoClient.createTodo.useMutation();

  return (
    <div>
      <p className="text-red-400">From Home</p>
      {todos.data?.body.data.map((t) => {
        return <p key={t.id}>{t.title}</p>;
      })}
      <Button
        isDisabled={createTodo.isLoading}
        onClick={async () => {
          createTodo.mutateAsync(
            {
              body: {
                title: 'this is a todo',
                completed: false,
              },
            },
            {
              onSuccess(data, variables, context) {
                qc.invalidateQueries({
                  queryKey: ['getTodos'],
                });
              },
            }
          );
        }}
      >
        {createTodo.isLoading ? 'Creating...' : 'Create Todos'}
      </Button>
    </div>
  );
}
