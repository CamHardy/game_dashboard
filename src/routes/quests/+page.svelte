<script>
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import * as Table from "$lib/components/ui/table";

  import Plus from "lucide-svelte/icons/plus";
	import Trash from "lucide-svelte/icons/trash-2";
  import Pencil from "lucide-svelte/icons/pencil";

  import Geolocation from "svelte-geolocation";
  let coords = [];

  let getPosition = false;

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
</script>

<div class="mx-auto my-6 items-center max-w-4xl p-6 space-y-4 rounded border">
  <h1 class="text-3xl font-bold">Quests</h1>
  <Dialog.Root>
    <Dialog.Trigger>
      <Button class>
        <Plus class="mr-2 size-4" />
        Add a quest
      </Button>
    </Dialog.Trigger>
    <Dialog.Content class>
      <Dialog.Header class>
        <Dialog.Title class>Add a quest</Dialog.Title>
        <Dialog.Description class>
          This action will add a quest.
        </Dialog.Description>
      </Dialog.Header>
      <form method="POST" action="?/create" class="flex flex-col space-y-2">
        <Input class type="text" name="name" placeholder="Name" />
        <Input class type="number" name="latitude" placeholder="Latitude" />
        <Input class type="number" name="longitude" placeholder="Longitude" />
        <br/>
        <Button class="w-48 self-center" type="submit">
          Add a quest
        </Button>
      </form>
    </Dialog.Content>
  </Dialog.Root>

  <div class="w-full h-[480px] overflow-auto rounded border">
    <Table.Root class>
      <Table.Header class="sticky w-full top-0 shadow bg-gray-100">
        <Table.Row class>
          <Table.Head class>ID</Table.Head>
          <Table.Head class>Name</Table.Head>
          <Table.Head class>Created At</Table.Head>
          <Table.Head class>Updated At</Table.Head>
          <Table.Head class>{''}</Table.Head>
        </Table.Row>
      </Table.Header>
      
      <Table.Body class>
        {#each data.quests as quest}
          <Table.Row class>
            <Table.Cell class="font-medium">{quest.id}</Table.Cell>
            <Table.Cell class>{quest.name}</Table.Cell>
            <Table.Cell class>{new Date(quest.createdAt).toDateString()}</Table.Cell>
            <Table.Cell class>{new Date(quest.updatedAt).toDateString()}</Table.Cell>
            <Table.Cell class>
              <div class="flex space-x-2">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <div class="w-10 h-10 flex justify-center items-center rounded-full hover:text-white hover:bg-gray-500">
                      <Pencil/>
                    </div>
                  </Dialog.Trigger>
                  <Dialog.Content class>
                    <Dialog.Header class>
                      <Dialog.Title class>Edit a quest</Dialog.Title>
                      <Dialog.Description class>
                        This action will edit a quest.
                      </Dialog.Description>
                    </Dialog.Header>
                    <form method="POST" action="?/edit" class="flex flex-col space-y-2">
                      <input type="hidden" name="id" value={quest.id} />
                      <Input class="" type="text" name="name" placeholder="Name" />
                      <Input class="" type="number" name="latitude" placeholder="Latitude" />
                      <Input class="" type="number" name="longitude" placeholder="Longitude" />
                      <br/>
                      <Button class="w-48 self-center" type="submit">
                        Edit
                      </Button>
                    </form>
                  </Dialog.Content>
                </Dialog.Root>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <div class="w-10 h-10 flex justify-center items-center rounded-full hover:text-white hover:bg-red-500">
                      <Trash/>
                    </div>
                  </Dialog.Trigger>
                  <Dialog.Content class>
                    <Dialog.Header class>
                      <Dialog.Title class>Delete a quest</Dialog.Title>
                      <Dialog.Description class>
                        Are you SURE? This cannot be undone.
                      </Dialog.Description>
                    </Dialog.Header>
                    <div class="flex justify-end space-x-2">
                      <Dialog.Close>
                        <Button class>Cancel</Button>
                      </Dialog.Close>
                      <form method="POST" action="?/delete">
                        <input type="hidden" name="id" value={quest.id} />
                        <Button class variant="destructive" type="submit">
                          Delete
                        </Button>
                      </form>
                    </div>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</div>