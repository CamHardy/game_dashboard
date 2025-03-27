<script>
  import { 
		Button,
		buttonVariants
	} from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  
  import Plus from "lucide-svelte/icons/plus";

	let isTemporary = $state(false);
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "default" })}>
			<Plus class="mr-2 size-4" />
			Add a dungeon
	</Dialog.Trigger>
	<Dialog.Content class>
		<Dialog.Header class>
			<Dialog.Title class>Add a dungeon</Dialog.Title>
			<!-- <Dialog.Description class>
				This action will add a dungeon.
			</Dialog.Description> -->
		</Dialog.Header>
		<hr>
		<form method="POST" action="?/create" class="flex flex-col space-y-2">
			<div class="pb-2 space-y-2">
				<label for="name">Name</label>
				<Input class="" id="name" type="text" name="name" placeholder="Name" />
			</div>
			<div class="pb-2 space-y-2">
				<label for="seed">Seed</label>
				<Input class="" id="seed" type="number" name="seed" placeholder="Seed" />
			</div>
			<div class="flex items-center space-x-2">
				<input type="checkbox" id="isTemporary" name="isTemporary" bind:checked={isTemporary} />
				<label for="isTemporary">Temporary</label>
			</div>
			{#if isTemporary}
				<div class="pb-2 space-y-2">
					<label for="expiryDate">Expiry Date</label>
					<Input class type="date" id="expiryDate" name="expiryDate" placeholder="1970-01-01" />
				</div>
			{/if}
			<br/>
			<Button class="w-48 self-center" type="submit">
				Add a dungeon
			</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>