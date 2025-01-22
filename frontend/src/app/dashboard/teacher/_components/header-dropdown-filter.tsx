'use client';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { AssignmentSubject } from '@/types/enum';
import { useAssignmentStore } from '@/stores/assignment-store';

const HeaderDropdownFilter = () => {
  const [open, setOpen] = React.useState(false);
  const { setFilterSubject, filterSubject } = useAssignmentStore();

  const subjects = [
    { label: 'English Writing', value: AssignmentSubject.ENGLISH_WRITING },
    { label: 'Math Homework', value: AssignmentSubject.MATH_HOMEWORK },
    { label: 'All', value: 'ALL' },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {filterSubject
            ? subjects.find((subject) => subject.value === filterSubject)?.label
            : 'Filter by Subject...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {subjects.map((subject) => (
                <CommandItem
                  key={subject.value}
                  value={subject.value}
                  onSelect={(currentValue) => {
                    setFilterSubject(
                      currentValue === filterSubject
                        ? 'ALL'
                        : (currentValue as AssignmentSubject)
                    );
                    setOpen(false);
                  }}
                >
                  {subject.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      filterSubject === subject.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderDropdownFilter;
