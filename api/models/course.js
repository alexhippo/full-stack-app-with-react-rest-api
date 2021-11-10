const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model { }
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A title for the course is required.'
        },
        notEmpty: {
          msg: 'Please provide a title for the course.'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A course description is required.'
        },
        notEmpty: {
          msg: 'Please provide a course description.'
        }
      }
    },
    estimatedTime: {
      type: DataTypes.STRING
    },
    materialsNeeded: {
      type: DataTypes.STRING
    }
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userid',
      }
    });
  }

  return Course;
}