import { API_URL } from '$env/static/private';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		players: await fetch(`${API_URL}/player`).then(res => res.json())
	};
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		let inventory = data.get('inventory');
		let inventoryJson = inventory ? JSON.parse(inventory.toString()) : null;
		const res = await fetch(`${API_URL}/player/create`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: data.get('username') || 'unnamed player',
      	model_id: 1,
      	experience_points: data.get('experience') || 0,
				health_points: data.get('health') || 0,
				damage_points: data.get('damage') || 0,
				energy_points: data.get('energy') || 0,
				currency: data.get('currency') || 0,
				inventory: inventoryJson || {
					items: [],
					equipped_items: [],
					action_items: []
				},
				active_quest: data.get('active_quest') || null,
				dungeon_tokens: []
			})
		});
		if (!res.ok) return fail(res.status, { success: false, message: 'Failed to create player' });
		return { success: true, message: 'Player created' };
	},
	edit: async ({ request }) => {
		const data = await request.formData();
		let inventory = data.get('inventory');
		let inventoryJson = inventory ? JSON.parse(inventory.toString()) : null;
		const res = await fetch(`${API_URL}/player/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: data.get('id'),
				username: data.get('username') || 'unnamed player',
      	model_id: 1,
      	experience_points: data.get('experience') || 0,
				health_points: data.get('health') || 0,
				damage_points: data.get('damage') || 0,
				energy_points: data.get('energy') || 0,
				currency: data.get('currency') || 0,
				inventory: inventoryJson || {
					items: [],
					equipped_items: [],
					action_items: []
				},
				active_quest: data.get('active_quest') || null,
				dungeon_tokens: []
			})
		});
		if (!res.ok) return fail(res.status, { success: false, message: 'Failed to edit player' });
		return { success: true, message: 'Player edited' };
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const res = await fetch(`${API_URL}/player/${id}`, {
			method: 'DELETE'
		});
		if (!res.ok) return fail(res.status, { success: false, message: 'Failed to delete player' });
		return { success: true, message: 'Player deleted' };
	}
};