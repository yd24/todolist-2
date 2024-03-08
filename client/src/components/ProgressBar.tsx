import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRewards } from '../api/taskapi';
import React from 'react';

export function ProgressBar() {
  const queryClient = useQueryClient();

  const {
    data: reward,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-reward"],
    queryFn: getRewards,
  });

  return (
    <div id="progress-container">
      {!isLoading &&
        <>
          <div id="reward-tracker">
            {reward.length === 0 &&
              'There is no reward set. Add a reward.'
            }
            {reward.length > 0 &&
              <>
                <p>{`Current reward is: ${reward[0].item}`}</p>
                <p>{`Points to get reward: ${reward[0].total_points}`}</p>
              </>
            }
          </div>
          <div id="progress-bar"></div>
          <button>Add Reward</button>
        </>
      }
    </div>
  );
}