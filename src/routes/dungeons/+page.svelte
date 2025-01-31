<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  
  import Plus from "lucide-svelte/icons/plus";
  import Trash from "lucide-svelte/icons/trash-2";
  import Pencil from "lucide-svelte/icons/pencil";

	/** @type {{ data: import('./$types').PageData }} */
  let {
    data
  } = $props();

  let isTemporary = $state(false);
  let editIsTemporary = $state(false);
</script>
 
<div class="mx-auto my-6 items-center max-w-4xl p-6 space-y-4 rounded border">
  <h1 class="text-3xl font-bold">Dungeons</h1>
  <Dialog.Root>
    <Dialog.Trigger>
      <Button class>
        <Plus class="mr-2 size-4" />
        Add a dungeon
      </Button>
    </Dialog.Trigger>
    <Dialog.Content class>
      <Dialog.Header class>
        <Dialog.Title class>Add a dungeon</Dialog.Title>
        <Dialog.Description class>
          This action will add a dungeon.
        </Dialog.Description>
      </Dialog.Header>
      <form method="POST" action="?/create" class="flex flex-col space-y-2">
        <Input class type="text" name="name" placeholder="Name" />
        <Input class type="number" name="seed" placeholder="Seed" />
        <div class="flex items-center space-x-2">
          <input type="checkbox" name="isTemporary" bind:checked={isTemporary} />
          <label for="isTemporary">Temporary</label>
        </div>
        {#if isTemporary}
          <Input class type="date" name="expiryDate" placeholder="Expiry Date" />
        {/if}
        <br/>
        <Button class="w-48 self-center" type="submit">
          Add a dungeon
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
        {#each data.dungeons as dungeon}
          <Table.Row class>
            <Table.Cell class="font-medium">{dungeon.id}</Table.Cell>
            <Table.Cell class>{dungeon.name}</Table.Cell>
            <Table.Cell class>{new Date(dungeon.createdAt).toDateString()}</Table.Cell>
            <Table.Cell class>{new Date(dungeon.updatedAt).toDateString()}</Table.Cell>
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
                      <Dialog.Title class>Edit a dungeon</Dialog.Title>
                      <Dialog.Description class>
                        This action will edit a dungeon.
                      </Dialog.Description>
                    </Dialog.Header>
                    <form method="POST" action="?/edit" class="flex flex-col space-y-2">
                      <input type="hidden" name="id" value={dungeon.id} />
                      <Input class type="text" name="name" placeholder="Name" />
                      <Input class type="text" name="seed" placeholder="Seed" />
                      <div class="flex items-center space-x-2">
                        <input type="checkbox" name="isTemporary" bind:checked={editIsTemporary} />
                        <label for="isTemporary">Temporary</label>
                      </div>
                      {#if editIsTemporary}
                        <Input class type="date" name="expiryDate" placeholder="Expiry Date" />
                      {/if}
                      <br/>
                      <Button class="w-48 self-center" type="submit">
                        Edit a dungeon
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
                      <Dialog.Title class>Delete a dungeon</Dialog.Title>
                      <Dialog.Description class>
                        Are you SURE? This cannot be undone.
                      </Dialog.Description>
                    </Dialog.Header>
                    <div class="flex justify-end space-x-2">
                      <Dialog.Close>
                        <Button class>Cancel</Button>
                      </Dialog.Close>
                      <form method="POST" action="?/delete">
                        <input type="hidden" name="id" value={dungeon.id} />
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