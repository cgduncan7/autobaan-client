<script>
  import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import dayjs from 'dayjs';
  
  /** @type {import('./$types').PageData}*/
  export let data;

  /** @type string | undefined*/
  export let errorMessage;

  /** @type Function */
  /** @returns string */
  export const roundToNearestQuarter = (/** @type string */ timeString) => {
    let t = dayjs(timeString)
    const currentMinutes = t.get('minutes');
    let desiredMinutes = currentMinutes;
    let addHour = false;
    switch (true) {
      case currentMinutes <= 7:
        desiredMinutes = 0;
        break;
      case currentMinutes <= 22:
        desiredMinutes = 15;
        break;
      case currentMinutes <= 37:
        desiredMinutes = 30;
        break;
      case currentMinutes <= 52:
        desiredMinutes = 45;
        break;
      default:
        desiredMinutes = 0;
        addHour = true; 
    }
    t = t.set('minutes', desiredMinutes)
    if (addHour) t.add(1, 'hours')
    return t.format('YYYY-MM-DDTHH:mm')
  }

  export const roundDatetimeInput = (/** @type Event & { currentTarget: EventTarget & HTMLInputElement; } */ event) => {
    if (event.target == null) return;
    const preRounding = event.currentTarget.value
    const postRounding = roundToNearestQuarter(preRounding)
    event.currentTarget.value = postRounding
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  form > label {
    width: 60%;
    margin-top: 10px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid gray;
  }

  form > label > span {
    flex: 1;
  }

  form > button {
    margin: auto;
    margin-top: 10px;
    width: 20%;
    padding: 10px;
  }
</style>

<form
  method="POST"
  use:enhance={({ formData, cancel }) => {
    const requiredFields = ['ownerId', 'recurring', 'startTime']
    const missingFields = []
    for (const field of requiredFields) {
      const value = formData.get(field)
      if (!value) {
        missingFields.push(field)
      }
    }

    if (missingFields.length > 0) {
      errorMessage = 'Missing fields: ' + missingFields.join(', ')
      cancel()
      return
    }
  }}
>
  <label>
    <span>Owner*</span>
    <select name="ownerId">
      {#each data.owners as owner}
      <option value={owner.value}>{owner.name}</option>
      {/each}      
    </select>
  </label>
  <label>
    <span>Recurring*</span>
    <select name="recurring">
      <option selected value="no">No</option>
      <option value="yes">Yes</option>
    </select>
  </label>
  <label>
    <span>Start time*</span>
    <input name="startTime" type="datetime-local" on:change={roundDatetimeInput}>
  </label>
  <label>
    <span>End time</span>
    <input name="endTime" type="datetime-local">
  </label>
  <label>
    <span>Opponent ID</span>
    <input name="opponentId" type="text" placeholder="-1">
  </label>
  <label>
    <span>Opponent Name</span>
    <input name="opponentName" type="text" placeholder="Gast">
  </label>
  <button>Create</button>
  {#if errorMessage}
  <span>{errorMessage}</span>
  {/if}
  <button on:click|preventDefault={() => goto('/')}>Cancel</button>
</form>