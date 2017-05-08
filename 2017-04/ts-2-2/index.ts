interface Flags { [name: string]: boolean }
let flags: Flags;
// new
flags.thisIsFine = true;
flags.imOkayWithTheEventsThatAreUnfoldingCurrently = true;
// still works
flags["That's okay, things are going to be okay."] = true;