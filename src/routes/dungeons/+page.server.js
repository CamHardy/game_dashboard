import { API_URL } from '$env/static/private';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		dungeons: await fetch(`${API_URL}/dungeon`).then(res => res.json())
	};
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const res = await fetch(`${API_URL}/dungeon/create`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: data.get('name') || 'unnamed dungeon',
				seed: data.get('seed') || 0,
				is_temporary: data.get('isTemporary') || false,
				expiry_time: data.get('expiryDate') || null
			})
		});
		if (!res.ok) return fail(res.status, { success: false, message: 'Failed to create dungeon' });
		return { success: true, message: 'Dungeon created' };
	},
	edit: async ({ request }) => {
		const data = await request.formData();
		const res = await fetch(`${API_URL}/dungeon/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: data.get('id'),
				name: data.get('name') || 'unnamed dungeon',
				seed: data.get('seed') || 0,
				is_temporary: data.get('isTemporary') || false,
				expiry_time: data.get('expiryDate') || null
			})
		});
		if (!res.ok) return fail(res.status, { success: false, message: 'Failed to update dungeon' });
		return { success: true, message: 'Dungeon edited' };
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const res = await fetch(`${API_URL}/dungeon/${id}`, {
			method: 'DELETE'
		});
		if (!res.ok) return fail(res.status, { success: false, message: 'Failed to delete dungeon' });
		return { success: true, message: 'Dungeon deleted' };
	}
};