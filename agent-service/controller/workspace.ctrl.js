const { Workspace } = require("../models");
let { v4: uuidv4 } = require("uuid");
// const { publish } = require("./rabbitmq");

const createWorkSpace = async (req, res) => {
  let { body } = req;

  let { workspace_name = "", user_id = "", domain = "" } = body;
  if (!workspace_name || !user_id || !domain) {
    return res
      .status(400)
      .json({ success: false, err: "Required params missing" });
  }
  let result = await Workspace.findOne({ name: workspace_name }).catch(
    (err) => {
      return res.status(500).json({ success: false, err });
    }
  );
  if (result) {
    return res.status(200).json({
      success: true,
      data: { workspace_created: false, message: "workspace already exists" },
    });
  }

  let workspaceDetails = {
    workspaceId: uuidv4(),
    name: workspace_name,
    domain: domain,
    users: [{ userId: user_id, isAdmin: true }],
  };
  let newWorkspace = Workspace(workspaceDetails);
  let data = await newWorkspace.save();
  //   await publish("workspace_created", data);
  return res.status(201).json({ success: true, data, workspace_create: true });
};

module.exports = { createWorkSpace };
