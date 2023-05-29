import {
    Guild,
    Message,
    PermissionsBitField,
    Client,
    GuildMember,
    AttachmentBuilder
} from "discord.js";

// Interfaces
interface betterConsoleConfig {
    color?: string,
    background?: string,
    bold?: boolean,
    underlined?: boolean,
    crossed?: boolean,
    showTime?: boolean
};

// Declaring the module and exporting everything
declare module 'discord.js-v14-helper';

// Classes
interface ApplicationCommandsRegisterPromiseData {
    returned: number,
    data: {
        commands: Array<ApplicationCommandBuilder>,
        token: string,
        id: string,
        guild: string | null,
        time: string | undefined,
        rest_version: number
    },
    errors: string | null
};

export class ApplicationCommandsRegister {
    public constructor(clientToken: string, clientId: string);

    public setApplicationCommands(commands: Array<ApplicationCommandBuilder>): this;
    public setRestVersion(version: number): this;
    public setRegisterInOneGuild(guild: Guild): this;
    public start(): Promise<ApplicationCommandsRegisterPromiseData>;
};

export class TextFileGenerator {
    public constructor(msg: string);

    public setFileName(name: string): this;
    public setFileDescription(description: string): this;
    public createFile(): AttachmentBuilder;
};

export class ApplicationCommandBuilder {
    public constructor();

    public setCommandType(type: number): this;
    public setName(name: string): this;
    public setDescription(description: string): this;
    public setOptions(options: Array<ApplicationCommandOptionsBuilder>): this;
    public setDefaultPermission(bool: boolean): this;
    public setDefaultGuildMemberPermissions(permission: PermissionsBitField): this;
    public setDirectMessagesPermissions(bool: boolean): this;
    public setNSFW(bool: boolean): this;
};

export class ApplicationCommandOptionsBuilder {
    public constructor();

    public setOptionType(type: number): this;
    public setName(name: string): this;
    public setDescription(description: string): this;
    public setOptions(options: Array<ApplicationCommandOptionsBuilder>): this;
    public addChoices(choices: Array<Object>): this;
    public setChannelTypes(channels: Array<number>): this;
    public setRequired(bool: boolean): this;
    public setAutocomplete(bool: boolean): this;
};

interface MongoDBConnectorPromiseData {
    returned: number,
    data: {
        connected: true,
        cluster: string,
    },
    errors: string | null
};

export class MongoDBConnector {
    public constructor(uri: string);

    public start(): Promise<MongoDBConnectorPromiseData>;
};

interface ClientPresenceBuilderPromiseData {
    returned: number,
    data: {
        activities: Array<string>,
        types: Array<number>,
        activity_chosen: {
            element: string,
            index: number | undefined
        },
        type_chosen: {
            element: string,
            index: number | undefined
        },
    },
    errors: string | null
};

export interface ClientPresenceBuilderStatusKeys {
    online: string;
    idle: string;
    dnd: string;
    invisible: string;
};

export class ClientPresenceBuilder {
    public constructor(client: Client);

    public setActivityNames(msgs: Array<string>): this;
    public setActivityTypes(types: Array<number>): this;
    public setStatus<K extends keyof ClientPresenceBuilderStatusKeys>(status: K): this;
    public setTwitchURL(url: string): this;

    public start(): Promise<ClientPresenceBuilderPromiseData>;
};

export class ApplicationCommandChoice {
    public constructor(name: string, value: string | number);
};

export class BetterConsoleLogger {
    public constructor(msg: string);

    public setTextColor(color: string): this;
    public setBackgroundColor(color: string): this;
    public setBold(bool: boolean): this;
    public setUnderlined(bool: boolean): this;
    public setCrossedOut(bool: boolean): this;
    public showCurrentTime(bool: boolean): this;

    public log(logDirectly: boolean): string;
};

export interface BoostDetectorEvents {
    boostCreate: (member: GuildMember) => void;
    boostRemove: (member: GuildMember) => void;
};

export class BoostDetector {
    public constructor(client: Client);

    public on<K extends keyof BoostDetectorEvents>(event: K, listener: BoostDetectorEvents[K]): this;
};

// Functions
export function betterConsole(text: string, config: betterConsoleConfig): string;

export function isDiscordServerInvite(content: Message): boolean;

export function isWebURL(content: Message, ignoreURLs: Array<string>): boolean;

// Properties
export const PackageInfo: {
    name: 'discord.js-v14-helper',
    description: string,
    version: number,
    homepage: string,
    license: string,
    developer: string,
    typescript_support: boolean,
    nodejs: string
};

export const Colors: {
    Black: 'black',
    Red: 'red',
    Green: 'green',
    Yellow: 'yellow',
    Blue: 'blue',
    Magenta: 'magenta',
    Cyan: 'cyan',
    White: 'white',
    Bright_black: 'bblack',
    Bright_red: 'bred',
    Bright_green: 'bgreen',
    Bright_yellow: 'byellow',
    Bright_blue: 'bblue',
    Bright_magenta: 'bmagenta',
    Bright_cyan: 'bcyan',
    Bright_white: 'bwhite'
};

export const CommandType: {
    Chat_input: 1,
    User: 2,
    Message: 3
};

export const CommandOptionType: {
    Sub_command: 1,
    Sub_command_group: 2,
    String: 3,
    Integer: 4,
    Boolean: 5,
    User: 6,
    Channel: 7,
    Role: 8,
    Mentionable: 9,
    Number: 10,
    Attachment: 11
};

export const ChannelType: {
    Text: 0,
    DM: 1,
    Voice: 2,
    Group_DM: 3,
    Category: 4,
    Announcement: 5,
    Announcement_thread: 10,
    Thread_public: 11,
    Thread_private: 12,
    Stage: 13,
    Directory: 14,
    Forum: 15
};

export const ClientIntents: Array<number>;
export const ClientPartials: Array<number>;