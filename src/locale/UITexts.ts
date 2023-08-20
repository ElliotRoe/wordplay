import type { SupportedFaces } from '../basis/Fonts';
import type EditTexts from './EditTexts';
import type { DocText, Template } from './Locale';

type UITexts = {
    font: {
        app: (typeof SupportedFaces)[number];
        code: (typeof SupportedFaces)[number];
    };
    phrases: {
        /** Used to address someone or say hi, on the login screen. */
        welcome: string;
        /** The motto for Wordplay on the landing page. */
        motto: string;
    };
    placeholders: {
        code: string;
        expression: string;
        type: string;
        percent: string;
        name: string;
        project: string;
        email: string;
    };
    description: {
        yes: string;
        no: string;
        play: string;
        pause: string;
        backStep: string;
        backNode: string;
        backInput: string;
        out: string;
        start: string;
        forwardStep: string;
        forwardNode: string;
        forwardInput: string;
        present: string;
        reset: string;
        home: string;
        docBack: string;
        revert: string;
        set: string;
        fullscreen: string;
        collapse: string;
        expand: string;
        close: string;
        changeLanguage: string;
        addLanguage: string;
        removeLanguage: string;
        horizontal: string;
        vertical: string;
        freeform: string;
        fit: string;
        grid: string;
        addPose: string;
        removePose: string;
        movePoseUp: string;
        movePoseDown: string;
        addGroup: string;
        addPhrase: string;
        removeContent: string;
        moveContentUp: string;
        moveContentDown: string;
        editContent: string;
        sequence: string;
        animate: string;
        addSource: string;
        editProject: string;
        copyProject: string;
        settings: string;
        newProject: string;
        dark: string;
        chooserExpand: string;
        place: string;
        paint: string;
        nextLesson: string;
        previousLesson: string;
        nextLessonStep: string;
        previousLessonStep: string;
        revertProject: string;
        showOutput: string;
        /** The button shown when a list of code is ellided; clicking it shows the hidden code. */
        expandCode: string;
        /** The next input shown in evaluate expressions that, when clicked, add a placeholder */
        addInput: string;
        /** How to describe the autocomplete menu */
        menu: string;
        /** How to describe the autocomplete back button for leaving the submenu */
        menuBack: string;
        /** Move caret to the line before */
        cursorLineBefore: string;
        /** Move caret to the line after */
        cursorLineAfter: string;
        cursorInlineBefore: string;
        cursorInlineAfter: string;
        cursorNeighborBefore: string;
        cursorNeighborAfter: string;
        cursorContainer: string;
        selectAll: string;
        incrementLiteral: string;
        decrementLiteral: string;
        insertSymbol: Template;
        insertTrueSymbol: string;
        insertFalseSymbol: string;
        insertNoneSymbol: string;
        insertNotEqualSymbol: string;
        insertProductSymbol: string;
        insertQuotientSymbol: string;
        insertDegreeSymbol: string;
        insertFunctionSymbol: string;
        insertLessThanOrEqualSymbol: string;
        insertGreaterThanOrEqualSymbol: string;
        insertStreamSymbol: string;
        insertPreviousSymbol: string;
        insertConvertSymbol: string;
        insertTableSymbol: string;
        insertLineBreak: string;
        backspace: string;
        copy: string;
        cut: string;
        paste: string;
        parenthesize: string;
        enumerate: string;
        type: string;
        undo: string;
        redo: string;
        help: string;
        documentationSearch: string;
        characterSearch: string;
        editTextOutput: string;
        editCoordinate: string;
        editSequencePercent: string;
        editProjectName: string;
        editSourceName: string;
        loginEmail: string;
        focusOutput: string;
        focusSource: string;
        focusDocs: string;
        focusPalette: string;
        focusCycle: string;
        conceptLink: Template;
        /** The description of the timeline slider */
        timeline: string;
        /** The button that creates a phrase when there is none */
        createPhrase: string;
        /** The button that creates a group when there is none */
        createGroup: string;
        /** The button that creates a stage when there is none */
        createStage: string;
    };
    button: {
        togglePublic: string;
    };
    confirm: {
        archiveProject: {
            description: string;
            prompt: string;
        };
        deleteSource: {
            description: string;
            prompt: string;
        };
    };
    prompt: {
        emptyProgram: DocText;
        /** How to describe the text input field in the output when there's a key stream active */
        keyStreamInput: string;
    };
    labels: {
        learn: string;
        nodoc: string;
        /** Shown in the output palette when multiple outputs are selected but they have unequal values. */
        mixed: string;
        /** Shown in the output palette when the output(s) selected have expressions that are not editable using the editor. */
        computed: string;
        /** Shown in the output palette when the output(s) selected have no value set, but have a default */
        default: string;
        /** Shown in the output palette when a value is unset but is inherited */
        inherited: string;
        /** Shown in the output palette when a sequence isn't valid */
        notSequence: string;
        /** Shown in the output palette when a list of content is isn't valid */
        notContent: string;
        /** Shown when using an anonymous account */
        anonymous: string;
    };
    header: {
        learn: string;
        projects: string;
        /** How to describe galleries of projects */
        galleries: string;
        about: string;
        examples: string;
        /** Documentation header in structure and functions before inputs */
        inputs: string;
        /** Documentation header in structure view before interfaces */
        interfaces: string;
        /** Documentation header in structure before properties */
        properties: string;
        /** Documentation header in structure before functions */
        functions: string;
        /** Documentation header in structure before conversions */
        conversions: string;
        /** How to label the locales that have been selected */
        selectedLocales: string;
        /** How to label the supported locales that have not been selected */
        supportedLocales: string;
        /** How to request help with localization */
        helpLocalize: string;
        moveCursor: string;
        editCode: string;
        insertCode: string;
        debug: string;
    };
    section: {
        project: string;
        conflicts: string;
        timeline: string;
        toolbar: string;
        output: string;
        palette: string;
        editor: string;
    };
    palette: {
        offerPhrase: Template;
        offerGroup: Template;
        offerStage: Template;
        pauseToEdit: Template;
        editing: Template;
    };
    feedback: {
        unknownProject: string;
        loading: string;
        save: {
            saving: string;
            saved: string;
            unsaved: string;
        };
    };
    login: {
        header: string;
        prompt: string;
        anonymousPrompt: string;
        enterEmail: string;
        submit: string;
        sent: string;
        success: string;
        failure: string;
        expiredFailure: string;
        invalidFailure: string;
        emailFailure: string;
        logout: string;
        offline: string;
    };
    edit: EditTexts;
    error: {
        notfound: { header: string; message: string };
        tutorial: string;
        /** The placeholder indicating that a locale string is not yet written */
        unwritten: string;
        /** The placeholder string indicating that a template string could not be parsed */
        template: string;
        /** What to show when there's no database connection. */
        noDatabase: string;
        /** When some other device had a more recent edit that overrode this device's version. */
        overwritten: string;
    };
    about: {
        content: string[];
    };
};

export default UITexts;
