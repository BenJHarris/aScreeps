export function calcCreepBody(body: BodyPartConstant[]) {
    let result = 0;
    _.forEach(body, (bp) => {
        result += BODYPART_COST[bp];
    });
    return result;
}
