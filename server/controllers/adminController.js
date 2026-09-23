import User from "../models/User.js";

const publicUserFields = "-passwordHash -__v";

export async function getDashboard(request, response, next) {
  try {
    const [total, active, suspended, pending, admins, recentUsers] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: "active" }),
      User.countDocuments({ status: "suspended" }),
      User.countDocuments({ status: "pending" }),
      User.countDocuments({ role: "admin" }),
      User.find().select(publicUserFields).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    response.json({
      users: { total, active, suspended, pending, admins },
      recentUsers,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(request, response, next) {
  try {
    const page = Number(request.query.page || 1);
    const limit = Number(request.query.limit || 20);
    const filter = {};

    if (request.query.role) filter.role = request.query.role;
    if (request.query.status) filter.status = request.query.status;
    if (request.query.search) {
      const escapedSearch = request.query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { name: { $regex: escapedSearch, $options: "i" } },
        { email: { $regex: escapedSearch, $options: "i" } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(filter)
        .select(publicUserFields)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      User.countDocuments(filter),
    ]);

    response.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(request, response, next) {
  try {
    const user = await User.findByIdAndUpdate(
      request.params.userId,
      { $set: request.body },
      { new: true, runValidators: true, select: publicUserFields },
    ).lean();

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    response.json({ user });
  } catch (error) {
    next(error);
  }
}