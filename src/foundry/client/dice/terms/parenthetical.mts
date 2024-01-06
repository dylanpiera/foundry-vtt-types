declare global {
  /**
   * A type of RollTerm used to enclose a parenthetical expression to be recursively evaluated.
   */
  class ParentheticalTerm extends RollTerm {
    constructor({ term, roll, options }: ParentheticalTerm.TermData);

    /** The original provided string term used to construct the parenthetical */
    term: ParentheticalTerm.TermData["term"];

    /** Alternatively, an already-evaluated Roll instance may be passed directly */
    roll: ParentheticalTerm.TermData["roll"];

    /**
     * The regular expression pattern used to identify the opening of a parenthetical expression.
     * This could also identify the opening of a math function.
     * @defaultValue
     * ```typescript
     * /([A-z][A-z0-9]+)?\(/g;
     * ```
     */
    static OPEN_REGEXP: RegExp;

    /**
     * A regular expression pattern used to identify the closing of a parenthetical expression.
     * @defaultValue
     * ```typescript
     * new RegExp("\\)(?:\\$\\$F[0-9]+\\$\\$)?", "g");
     * ```
     */
    static CLOSE_REGEXP: RegExp;

    /** An array of evaluated DiceTerm instances that should be bubbled up to the parent Roll */
    get dice(): DiceTerm[];

    override get isDeterministic(): boolean;

    /**
     * Construct a ParentheticalTerm from an Array of component terms which should be wrapped inside the parentheses.
     * @param terms - The array of terms to use as internal parts of the parenthetical
     * @param options - Additional options passed to the ParentheticalTerm constructor
     * @returns  The constructed ParentheticalTerm instance
     *
     * @example Create a Parenthetical Term from an array of component RollTerm instances
     * ```typescript
     * const d6 = new Die({number: 4, faces: 6});
     * const plus = new OperatorTerm({operator: "+"});
     * const bonus = new NumericTerm({number: 4});
     * t = ParentheticalTerm.fromTerms([d6, plus, bonus]);
     * t.formula; // (4d6 + 4)
     * ```
     */
    static fromTerms(terms: RollTerm[], options?: Partial<RollTerm.Options>): ParentheticalTerm;
  }

  namespace ParentheticalTerm {
    interface TermData {
      term: string;
      roll: Roll;
      options: RollTerm.Options;
    }
  }
}
