import rules from '@/libs/rules';

let roleRules = {};

roleRules["role.roleName"] = [rules.required(), rules.maxLength(40)];
roleRules["role.enable"] = [rules.required()];
roleRules["role.sortNo"] = [rules.required()];
roleRules["role.remark"] = [rules.required(), rules.maxLength(255)];

export default roleRules;
