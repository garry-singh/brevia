'use client';

import { forwardRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ref: React.RefObject<HTMLFormElement>;
  isLoading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <form onSubmit={onSubmit} ref={ref} className="flex flex-col gap-6">
        <div className="flex justify-end items-center gap-2">
          <Input
            id="file"
            name="file"
            type="file"
            accept="application/pdf"
            required
            className={cn(isLoading && 'opacity-50 cursor-not-allowed')}
            disabled={isLoading}
          />
          <Button disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              'Upload your PDF'
            )}
          </Button>
        </div>
      </form>
    );
  }
);

UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;
