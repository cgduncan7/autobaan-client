<script>
  /** @type {import('./$types').PageData}*/
  export let data;

  /** @type {(reservationId: string) => Promise<void>} */
  async function cancel (reservationId) {
    data.reservations = data.reservations.filter(({ id }) => id !== reservationId)
    await fetch(`/api/reservations/${reservationId}`, { method: 'DELETE' });
  }
</script>

<style>
</style>

<div>
  {#if data.reservations.length > 0}
    <div class="reservations">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Owner</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>Opponent</th>
            <th>Wait Listed?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each data.reservations as reservation}
          <tr>
            <td>{reservation.id}</td>
            <td>{reservation.ownerId}</td>
            <td class="centered">{reservation.dateRangeStart.format('ddd MMM DD')}</td>
            <td class="centered">{reservation.dateRangeStart.format('HH:mm')}</td>
            <td>{reservation.opponentName}</td>
            <td class="centered">{reservation.waitListed ? 'Yes' : 'No'}</td>
            <td class="centered columns">
              <button on:click={() => cancel(reservation.id)}>Cancel</button>
            </td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <span>No reservations found</span>
  {/if}
  <a href="/new">New Reservation</a>
</div>