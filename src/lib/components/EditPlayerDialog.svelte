<script>
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import Pencil from "lucide-svelte/icons/pencil";
	import CircleFadingArrowUp from "lucide-svelte/icons/circle-fading-arrow-up";
	import Heart from "lucide-svelte/icons/heart";
	import Sword from "lucide-svelte/icons/sword";
	import Zap from "lucide-svelte/icons/zap";
	import DollarSign from "lucide-svelte/icons/dollar-sign";

	let { player } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger onclick={(e) => e.stopPropagation()}>
		<div class="w-10 h-10 z-10 flex justify-center items-center rounded-full hover:text-white hover:bg-gray-500">
			<Pencil/>
		</div>
	</Dialog.Trigger>
	<Dialog.Content class>
		<Dialog.Header class>
			<Dialog.Title class>Edit a player</Dialog.Title>
			<Dialog.Description class>
				This action will edit a player.
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/edit" class="flex flex-col space-y-2">
			<input type="hidden" name="id" value={player.id} />
			<Input class="" type="text" name="username" value={player.username} placeholder="Username" />
			<div class="flex py-3 justify-between space-x-4">
				<div class="flex justify-between items-center space-x-2">
					<div class="w-5 h-5 z-10 flex justify-center items-center">
						<CircleFadingArrowUp/>
					</div>
					<Input class="" type="number" name="experience" value={player.experience_points} placeholder="XP" />
				</div>
				<div class="flex justify-between items-center space-x-2">
					<div class="w-5 h-5 z-10 flex justify-center items-center text-red-500">
						<Heart/>
					</div>
					<Input class="" type="number" name="health" value={player.health_points} placeholder="HP" />
				</div>
				<div class="flex justify-between items-center space-x-2">
					<div class="w-5 h-5 z-10 flex justify-center items-center">
						<Sword/>
					</div>
					<Input class="" type="number" name="damage" value={player.damage_points} placeholder="DMG" />
				</div>
				<div class="flex justify-between items-center space-x-2">
					<div class="w-5 h-5 z-10 flex justify-center items-center text-yellow-500">
						<Zap/>
					</div>
					<Input class="" type="number" name="energy" value={player.energy_points} placeholder="ENG" />
				</div>
			</div>
			<div class="flex justify-between items-center space-x-2">
				<div class="w-5 h-5 z-10 flex justify-center items-center text-green-500">
					<DollarSign/>
				</div>
				<Input class="" type="number" name="currency" value={player.currency} placeholder="Currency" />
			</div>
			<br/>
			<textarea 
				class="px-4 py-2 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
				rows="10" 
				name="inventory" 
				value={JSON.stringify(player.inventory, null, 2)} 
				placeholder="Inventory"></textarea>
			<Button class="w-48 self-center" type="submit">
				Edit
			</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>