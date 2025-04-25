module.exports = {
  privGroups: [
    {
      id: "USERS",
      name: "User Permissions",
    },
    {
      id: "ROLES",
      name: "User Permissions",
    },
    {
      id: "CATEGORİES",
      name: "User Permissions",
    },
    {
      id: "AUDITLOGS",
      name: "User Permissions",
    },
  ],
  privileges: [
    {
      key: "user_view",
      name: "User view",
      group: "USERS",
      description: "User view",
    },
    {
      key: "user_add",
      name: "User add",
      group: "USERS",
      description: "User add",
    },
    {
      key: "user_update",
      name: "User update",
      group: "USERS",
      description: "User update",
    },
    {
      key: "user_delete",
      name: "User delete",
      group: "USERS",
      description: "User delete",
    },
    {
      key: "role_view",
      name: "Role view",
      group: "ROLES",
      description: "Role view",
    },
    {
      key: "role_add",
      name: "Role add",
      group: "ROLES",
      description: "Role add",
    },
    {
      key: "role_update",
      name: "Role update",
      group: "ROLES",
      description: "Role update",
    },
    {
      key: "role_delete",
      name: "Role delete",
      group: "ROLES",
      description: "Role delete",
    },
    {
      key: "category_view",
      name: "Category view",
      group: "CATEGORİES",
      description: "Category view",
    },
    {
      key: "category_add",
      name: "Category add",
      group: "CATEGORİES",
      description: "Category add",
    },
    {
      key: "category_update",
      name: "Category update",
      group: "CATEGORİES",
      description: "Category update",
    },
    {
      key: "category_delete",
      name: "Category delete",
      group: "CATEGORİES",
      description: "Category delete",
    },
    {
      key: "category_export",
      name: "Category Export",
      group: "CATEGORIES",
      description: "Category Export",
    },
    {
      key: "auditlogs_view",
      name: "AuditLogs delete",
      group: "AUDITLOGS",
      description: "AuditLogs view",
    },
  ],
};
