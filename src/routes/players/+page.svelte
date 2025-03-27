<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import { slide } from 'svelte/transition';
  import { toast } from "svelte-sonner";

  import EditPlayerDialog from "$lib/components/EditPlayerDialog.svelte";
  import AddPlayerDialog from "$lib/components/AddPlayerDialog.svelte";

  import Trash from "lucide-svelte/icons/trash-2";

  /** @type { number[] }*/
  let openRows = $state([]);
	/** @type {{ data: import('./$types').PageData, form: import('./$types').ActionData }} */
	let { data, form } = $props();

  $effect(() => {
    // display form toasts
    if (form) {
      if (form.success === true) {
        toast.success(form.message || "Success!");
      } else {
        toast.error(form.message || "An error occurred.");
      }
    }

    // sort data.players ascending by id
    // console.log(data.players);
    // data.players.sort(
    //   /** 
    //    * @param {{ id: number }} a
    //    * @param {{ id: number }} b
    //   */
    //   (a, b) => a.id - b.id);
    // console.log(data.players);
  })
</script>

<div class="mx-auto my-6 items-center max-w-4xl p-6 space-y-4 rounded border">
  <h1 class="text-3xl font-bold">Players</h1>
  <AddPlayerDialog/>

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
        {#each data.players as player}
          <!-- <Table.Row class="cursor-pointer" onclick={() => { let row = openRows.findIndex(e => e === player.id); if (row >= 0) { openRows.splice(row, 1) } else openRows.push(player.id);}}> -->
          <Table.Row class="">
            <Table.Cell class="font-medium">{player.id}</Table.Cell>
            <Table.Cell class>{player.username}</Table.Cell>
            <Table.Cell class>{new Date(player.createdAt).toDateString()}</Table.Cell>
            <Table.Cell class>{new Date(player.updatedAt).toDateString()}</Table.Cell>
            <Table.Cell class>
              <div class="flex space-x-2">
                <EditPlayerDialog {player}/>
                <Dialog.Root>
                  <Dialog.Trigger onclick={(e) => e.stopPropagation()}>
                    <div class="w-10 h-10 flex justify-center items-center rounded-full hover:text-white hover:bg-red-500">
                      <Trash/>
                    </div>
                  </Dialog.Trigger>
                  <Dialog.Content class>
                    <Dialog.Header class>
                      <Dialog.Title class>Delete a player</Dialog.Title>
                      <Dialog.Description class>
                        Are you SURE? This cannot be undone.
                      </Dialog.Description>
                    </Dialog.Header>
                    <div class="flex justify-end space-x-2">
                      <Dialog.Close>
                        <Button class>Cancel</Button>
                      </Dialog.Close>
                      <form method="POST" action="?/delete">
                        <input type="hidden" name="id" value={player.id} />
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
          <!-- {#if openRows.includes(player.id)}
            <div transition:slide class="p-4 ml-8 overflow-x-auto bg-gray-100 rounded-lg">
              <pre>{JSON.stringify(player, null, 2)}</pre>
            </div>
          {/if} -->
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</div>