
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function update_dict(dest, src) {
    for (key in src) {
        dest[key] = src[key]
    }
    return dest;
}

function createEntity(server_entity, manager) {
    var EntityClasses = {
        "player": EntityPlayer
    }
    var res = new EntityClasses[server_entity.s_type](server_entity, manager);
    return res;
}
