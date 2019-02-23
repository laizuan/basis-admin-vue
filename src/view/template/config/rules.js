import rules from '@/libs/rules';

let userRules = {};

userRules["user.userName"] = [rules.required()];
userRules["user.phone"] = [rules.required(), rules.phone()];
userRules["user.namePinyin"] = [rules.ischinese()];
userRules["user.email"] = [rules.email()];
userRules["user.idCard"] = [rules.idCard()];
userRules["user.deptId"] = [rules.required()];
userRules["user.account"] = [rules.ischinese()];
userRules["user.password"] = [rules.ischinese()];
userRules["user.enable"] = [rules.required()];

export default userRules;
