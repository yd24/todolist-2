export function RewardModal() {
  return (
    <>
        <div id="reward-modal-container">
          <p id="reward-modal-close">
            <button>X</button>
          </p>
          <div id="reward-modal-input">
            <label>
              <p>Reward Item:</p>
              <input
                name="reward-title"
                type="text"
                maxLength={255}
                size={25}
              />
            </label>
            <label>
              <p>Points Needed:</p>
              <input
                name="points"
                type="number"
                min="0"
                max="9999"
              />
            </label>
            <div id="reward-modal-btns">
              <button
              >
                Add Reward
              </button>
            </div>
          </div>
        </div>
    </>
  );
}