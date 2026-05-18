import { Command } from "cmdk";

export default function CommandPalette() {
  return (
    <Command className="glass rounded-3xl p-4 max-w-xl mx-auto">
      <Command.Input
        placeholder="Search transactions..."
        className="w-full bg-transparent outline-none text-lg"
      />

      <Command.List className="mt-4">
        <Command.Empty>No results.</Command.Empty>

        <Command.Item className="p-2 rounded-xl hover:bg-white/40 cursor-pointer">
          Add Transaction
        </Command.Item>

        <Command.Item className="p-2 rounded-xl hover:bg-white/40 cursor-pointer">
          Open Analytics
        </Command.Item>
      </Command.List>
    </Command>
  );
}