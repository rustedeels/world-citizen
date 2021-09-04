import { CliCommand } from './cli.model.ts';
import { InitCommand } from './init.cmd.ts';
import { ParserCommand } from './parser.cmd.ts';

export const CliCommandMap: CliCommand[] = [
  InitCommand,
  ParserCommand,
];
