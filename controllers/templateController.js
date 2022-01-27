const pg_client = require('../db/connection');
const query_format = require('pg-format');
const error_builder = require('../utils/error_builder');

class DocumentController {
  async createTemplate(req, res) {
    const {
      userId,
      title,
      templateBody
    } = req.body;
    const regexForGettingTags = /(?<=\[).+?(?=\])/g;

    let allTagNamesFromTemplate = templateBody.match(regexForGettingTags);
    let templateId = 0;
    let tagIdList = [];

    pg_client.query('SELECT * fromm tags').then(result => {
      const allTags = result.rows;

      // Filter tags array, get those tags that exists in database, and push them to tagIdList
      const existingTags = allTags.filter(tag => allTagNamesFromTemplate.includes(tag.name))
      if (existingTags.length != 0) existingTags.forEach(tag => tagIdList.push(tag.id)); 
    
      // Creating array that includes tag names from tags object array
      const allTagNamesFromDatabase = allTags.map(function (tagObject) {
        return tagObject.name;
      });

      // Filter tag names from template array, get those tags that doesn't exists in database,
      // and change array from [clientName, clientPhone, ...] to [[clientName], [clientPhone], [...]] for pg-format
      const newTags = allTagNamesFromTemplate
        .filter(tag => !allTagNamesFromDatabase.includes(tag))
        .map(tag => [tag]);

      // Insert new tags
      if (newTags.length != 0) {
        pg_client.query(query_format(`INSERT INTO tags (name) VALUES %L RETURNING id`, newTags)).then(result => {
          const insertedTagIds = result.rows;
          console.log(`Tags before inserting: ${tagIdList}`);
          for (let i = 0; i < insertedTagIds.length; i++) {
            tagIdList.push(insertedTagIds[i].id);
          }
          
          console.log(`Tags after inserting: ${tagIdList}`);

          // INSERT TEMPLATES
          pg_client.query(`INSERT INTO templates (user_id, template_body, title) VALUES (${userId}, '${templateBody}', '${title}') RETURNING id`).then(result => {
            templateId = result.rows[0].id;
            console.log(`Template successfully inserted with id: ${templateId}`);

            const tagIdListForFormat = tagIdList.map(tagId => [templateId, tagId]); 
            pg_client.query(query_format(`INSERT INTO template_tags_relationship (template_id, tag_id) VALUES %L`, tagIdListForFormat)).then(result => {
              res.json({msg: 'success'});
            }).catch(err => res.status(400).json(error_builder(err, 'Error while inserting template_tags_relationship')));
          }).catch(err => res.status(400).json(error_builder(err, 'Error while inserting template')));
        }).catch(err => res.status(400).json(error_builder(err, 'Error while inserting tags')));
      } else {

        // INSERT TEMPLATES
        pg_client.query(`INSERT INTO templates (user_id, template_body, title) VALUES (${userId}, '${templateBody}', '${title}') RETURNING id`).then(result => {
          templateId = result.rows[0].id;
          console.log(`Template successfully inserted with id: ${templateId}`);

          const tagIdListForFormat = tagIdList.map(tagId => [templateId, tagId]);    
          pg_client.query(query_format(`INSERT INTO template_tags_relationship (template_id, tag_id) VALUES %L`, tagIdListForFormat)).then(result => {
            res.json({msg: 'success'});
          }).catch(err => res.status(400).json(error_builder(err, 'Error while inserting template')));
        }).catch(err => res.status(400).json(error_builder(err, 'Error while inserting tags')));
      }
    })
    .catch(err => res.status(400).json(error_builder(err, 'Error while select tags')));
  }



  // update template
  async updateTemplate(req, res) {
    const {
      userId,
      title,
      templateBody
    } = req.body;
    const regexForGettingTags = /(?<=\[).+?(?=\])/g;

    const rows = 1
    console.log(rows);
  };



  //get all Templates
  async getTemplates(req, res) {
    pg_client.query('SELECT title,user_id,id FROM templates', (err, result) => {
      if (err) throw err;
      else {
        res.status(200).json(result.rows)
      }
    });
  }




  // get tags by template id;
  async getTagsByTemplateID(req, res) {
    const TemplateId = req.params.id;
    const tags_id = (await pg_client.query('SELECT tag_id from template_tags_relationship where template_id = $1', [TemplateId])).rows;
    if (!tags_id) {
      res.status(400).json({
        success: false
      })
    }
    let tagNamesArr = [];
    for (let i = 0; i < tags_id.length; i++) {
      let tag_id = tags_id[i].tag_id;
      const tag_name = (await pg_client.query('SELECT name from tags where id = $1', [tag_id])).rows[0];
      if (!tag_name) {
        res.status(400).json({
          success: false
        })
      }
      tagNamesArr.push(tag_name.name)
    }
    res.status(200).json(tagNamesArr)
  }




  //get template by id
  async getTemplateByID(req, res) {
    const id = req.params.id;
    pg_client.query('SELECT title,template_body FROM templates where id = $1', [id], (err, result) => {
      if (err) throw err;
      else {
        res.status(200).json(result.rows)
      }
    });
  }

  //delete template
  async deleteTemplateByID(req, res) {
    const id = req.params.id;
    const TemplateTagsID = [];
    const tags_id = (await pg_client.query('SELECT tag_id from template_tags_relationship where template_id = $1', [id])).rows;
    if (!tags_id) {
      res.status(400).json({
        success: false, msg: 'tags does not select from template_tags_relationship by templateID'
      })
    }
    for(let i=0;i<tags_id.length;i++){
      TemplateTagsID.push(tags_id[i].tag_id)
    };
    console.log("Template tags: " + TemplateTagsID);
    
    //Delete relationship by template ID
    const isDeleteRelation = (await pg_client.query('DELETE from template_tags_relationship where template_id = $1', [id]));
    if (!isDeleteRelation) {
      res.status(400).json({
        success: false, msg: 'Relation do not deleted'
      })
    }

    const allRelationshipTagsID = [];   

    const alltags = (await pg_client.query('SELECT tag_id from template_tags_relationship')).rows;
    if (!alltags) {
      res.status(400).json({
        success: false, msg: 'All tags does not select from template_tags_relationship'
      })
    }
    for(let i=0;i<alltags.length;i++){
      allRelationshipTagsID.push(alltags[i].tag_id)
    };
    console.log("After deleting relationship tags " + allRelationshipTagsID);

    // Filter tag names from template array, get those tags that doesn't exists in database
    const DelatingTagsID = TemplateTagsID.filter(tag => !allRelationshipTagsID.includes(tag));
    console.log("Deleting tags: " + DelatingTagsID);

    //Delete template by ID
    const isDeleteTemplate = (await pg_client.query('DELETE from templates where id = $1', [id]));
    if (!isDeleteTemplate) {
      res.status(400).json({
        success: false, msg: 'Template do not delete from templates'
      })
    }

    //Delete filtering tags
    for(let i=0;i<DelatingTagsID.length;i++){
      const isDeleteTag = (await pg_client.query('DELETE from tags where id = $1', [DelatingTagsID[i]]));
      if (!isDeleteTag) {
        res.status(400).json({
          success: false, msg: 'Tag do not delete from tags'
        })
      }
    }

    res.status(200).json({succsess: true, msg: "Filtering TemplateTags, Template and Template from Relationship succsessfully deleted"});
    


  }
}


module.exports = new DocumentController();