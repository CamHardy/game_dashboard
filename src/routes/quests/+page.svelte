<script>
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Table from "$lib/components/ui/table";
  import Geolocation from "svelte-geolocation";
  import { slide } from 'svelte/transition';
  import { toast } from "svelte-sonner";

  import AddQuestDialog from "$lib/components/AddQuestDialog.svelte";
  import EditQuestDialog from "$lib/components/EditQuestDialog.svelte";
  
	import Trash from "lucide-svelte/icons/trash-2";
  
  let coords = [];
  let getPosition = false;

	/** @type {{ data: import('./$types').PageData, form: import('./$types').ActionData }} */
	let { data, form } = $props();

  $effect(() => {
    // display form toasts
    if (form) {
      if (form.success === true) {
        toast.success(form.message || "Success!");
      } else {
        toast.error(form.message || "An error occured.");
      }
    }
  })
</script>

<div class="mx-auto my-6 items-center max-w-4xl p-6 space-y-4 rounded border">
  <h1 class="text-3xl font-bold">Quests</h1>
  <AddQuestDialog/>

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
                <EditQuestDialog {quest}/>
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