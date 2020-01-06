const request = require( 'request' );
const atob = require( 'atob' );
const btoa = require( 'btoa' );
const debug = require('debug')('jira-backend:server');

const baseURL = `${ process.env.JIRA_API_URL }/rest/api/3`;
const basicAuth = btoa( `${ process.env.JIRA_API_USER }:${ process.env.JIRA_API_TOKEN }` )

let reqOptions = {
	json: true,
	headers: {
		'Authorization': `Basic ${ basicAuth }`,
		'User-Agent': 'jira-dashboard',
	}
};

function getIssueDetails( key = '' ) {
	return new Promise( ( resolve, reject ) => {

		reqOptions.url = `${ baseURL }/issue/${ key }`;

		request( reqOptions, ( err, res, body ) => {
			if ( err ) {
				reject( err );
			}

			if ( 'object' !== typeof body ) {
				reject( 'Body is not an object' );
				return;
			}

			const issue = {
				key: body.key,
				assignee: body.fields.assignee,
				summary: body.fields.summary,
				components: body.fields.components.filter( component => component.name ),
				type: body.fields.issuetype.name,
				status: body.fields.status.name
			};

			debug( 'Issue', issue );

			resolve( issue );
		} );
	} );
}

function getEpicIssues( key = '' ) {
	return new Promise( ( resolve, reject ) => {

		reqOptions.url = `${ baseURL }/search?jql="Epic Link"=${ key }`;

		request( reqOptions, ( err, res, body ) => {
			if ( err ) {
				reject( err );
			}

			if ( 'object' !== typeof body ) {
				reject( 'Body is not an object' );
				return;
			}

			const issues = [];

			for ( const issue of body.issues ) {
				issues.push(
					{
						key: issue.key,
						assignee: issue.fields.assignee,
						components: issue.fields.components.filter( component => component.name ),
						type: issue.fields.issuetype.name,
						status: issue.fields.status.name,
						epic: issue.fields.customfield_10007,
					}
				);
			}

			debug( 'Epic Issues', issues.length );

			resolve( issues );
		} );
	} );
}

module.exports = {
	getIssueDetails,
	getEpicIssues,
};
