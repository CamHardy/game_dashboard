<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import UserRound from "lucide-svelte/icons/user-round";
  import MapPin from "lucide-svelte/icons/map-pin";
  import Award from "lucide-svelte/icons/award";

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
</script>


<div class="mx-auto my-6 items-center max-w-4xl p-6 space-y-4 rounded border">
  <h1 class="text-3xl font-bold">Dashboard</h1>
  <Card.Root class>
    <Card.Header class>
      <Card.Title class="flex items-center"><UserRound class="mr-2 size-6" />Players</Card.Title>
    </Card.Header>
    <Card.Content class>
      <p>There are currently <b>{data.playerCount}</b> players.</p>
    </Card.Content>
  </Card.Root>
  <Card.Root class>
    <Card.Header class>
      <Card.Title class="flex items-center"><MapPin class="mr-2 size-6" />Quests</Card.Title>
    </Card.Header>
    <Card.Content class>
      <p>There are currently <b>{data.questCount}</b> quests.</p>
    </Card.Content>
  </Card.Root>
  <Card.Root class>
    <Card.Header class>
      <Card.Title class="flex items-center"><Award class="mr-2 size-6" />Dungeons</Card.Title>
    </Card.Header>
    <Card.Content class>
      <p>There are currently <b>{data.dungeonCount}</b> dungeons.</p>
    </Card.Content>
  </Card.Root>
</div>