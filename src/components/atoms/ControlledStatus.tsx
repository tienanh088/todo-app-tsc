import React from "react";
import { Control, Controller } from "react-hook-form";
import { ITask } from "../../types/common";
import { FormControl, FormLabel, HStack, Radio, RadioGroup } from "@chakra-ui/react";

interface ControlledStatusProps {
  control: Control<ITask>
}

export const ControlledStatus = (props: ControlledStatusProps) => {
  const { control } = props;

  return <Controller
    control={control}
    name={'isDone'}
    render={({ field }) => <FormControl isRequired>
      <FormLabel>Done?</FormLabel>
      <RadioGroup defaultValue={field.value.toString()}>
        <HStack spacing={'10px'}>
          <Radio value={'true'} onChange={() => field.onChange(true)}>Yes</Radio>
          <Radio value={'false'} onChange={() => field.onChange(false)}>No</Radio>
        </HStack>
      </RadioGroup>
    </FormControl>
    }
  />;
};
