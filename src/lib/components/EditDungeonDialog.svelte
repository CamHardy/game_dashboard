<script>
	import { Button } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import Pencil from "lucide-svelte/icons/pencil";

	let { dungeon } = $props();
  let isTemporary = $state(dungeon.is_temporary);
	$effect(() => {
		console.log(dungeon);
	})
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<div class="w-10 h-10 flex justify-center items-center rounded-full hover:text-white hover:bg-gray-500">
			<Pencil/>
		</div>
	</Dialog.Trigger>
	<Dialog.Content class>
		<Dialog.Header class>
			<Dialog.Title class>Edit a dungeon</Dialog.Title>
			<!-- <Dialog.Description class>
				This action will edit a dungeon.
			</Dialog.Description> -->
		</Dialog.Header>
		<hr>
		<form method="POST" action="?/edit" class="flex flex-col space-y-2">
			<input type="hidden" name="id" value={dungeon.id} />
			<div class="pb-2 space-y-2">
				<label for="name">Name</label>
				<Input class="" id="name" type="text" name="name" value={dungeon.name} placeholder="Name" />
			</div>
			<div class="pb-2 space-y-2">
				<label for="seed">Seed</label>
				<Input class type="text" name="seed" value={dungeon.seed} placeholder="Seed" />
			</div>
			<div class="flex items-center space-x-2">
				<input type="checkbox" id="isTemporary" name="isTemporary" bind:checked={isTemporary} />
				<label for="isTemporary">Temporary</label>
			</div>
			{#if isTemporary}
				<div class="pb-2 space-y-2">
					<label for="expiryDate">Expiry Date</label>
					<Input class type="date" name="expiryDate" value={new Date(dungeon.expiry_time).toISOString().split('T')[0]} placeholder="1970-01-01" />
				</div>
			{/if}
			<br/>
			<Button class="w-48 self-center" type="submit">
				Edit a dungeon
			</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>