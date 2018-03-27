import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.checkpoint.CheckpointFactory as CheckpointFactory
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testdata.InternalData
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable as GlobalVariable
import org.junit.After as After
import org.openqa.selenium.Keys as Keys


WebUI.openBrowser(null)
WebUI.navigateToUrl('http://localhost:3000')

username = findTestObject('SignIn/username')
WebUI.click(username)
WebUI.setText(username, 'admin')

password = findTestObject('SignIn/password')
WebUI.click(password)
WebUI.setText(password, 'password')

loginButton = findTestObject('SignIn/login')
WebUI.click(loginButton)

New = findTestObject("NewManuscript/journalfFieldSelection/New")
WebUI.click(New)

journal = findTestObject('NewManuscript/journalfFieldSelection/Journal')
WebUI.click(journal)

hindawiFaraday = findTestObject('NewManuscript/journalfFieldSelection/HindawiFaraday')
WebUI.click(hindawiFaraday)

issue = findTestObject('NewManuscript/journalfFieldSelection/Issue')
WebUI.click(issue)

regularIssues = findTestObject('NewManuscript/journalfFieldSelection/RegularIssues')
WebUI.click(regularIssues)

nextButton = findTestObject('NewManuscript/journalfFieldSelection/Next')
WebUI.click(nextButton)

hasEmail = findTestObject('NewManuscript/preSubmissionChecklist/hasEmail')
WebUI.check(hasEmail)

hasManuscript = findTestObject('NewManuscript/preSubmissionChecklist/hasManuscript')
WebUI.check(hasManuscript)

hasEfiles = findTestObject('NewManuscript/preSubmissionChecklist/hasEfiles')
WebUI.check(hasEfiles)

awareAndAccept = findTestObject('NewManuscript/preSubmissionChecklist/awareAndAccept')
WebUI.check(awareAndAccept)

hasOrcid = findTestObject('NewManuscript/preSubmissionChecklist/hasOrcid')
WebUI.check(hasOrcid)

submissionInstitutional = findTestObject('NewManuscript/preSubmissionChecklist/submissionInstitutional')
WebUI.check(submissionInstitutional)

Next = findTestObject('NewManuscript/preSubmissionChecklist/Next')
WebUI.click(Next)

manuscriptTitle = findTestObject('NewManuscript/manuscriptAuthorsDetails/manuscriptTitle')
WebUI.click(manuscriptTitle)
WebUI.sendKeys(manuscriptTitle, 'A new random title')

manuscriptType = findTestObject('NewManuscript/manuscriptAuthorsDetails/manuscriptType')
WebUI.click(manuscriptType)

research = findTestObject('NewManuscript/manuscriptAuthorsDetails/Research')
WebUI.click(research)

abstractField = findTestObject('NewManuscript/manuscriptAuthorsDetails/abstractField')
WebUI.click(abstractField)
WebUI.sendKeys(abstractField, 'A new random abstract text')

addAuthor = findTestObject('NewManuscript/manuscriptAuthorsDetails/addAuthor')
WebUI.click(addAuthor)

firstName = findTestObject('NewManuscript/manuscriptAuthorsDetails/firstName')
WebUI.setText(firstName, 'Vlad')

lastName = findTestObject('NewManuscript/manuscriptAuthorsDetails/lastName')
WebUI.setText(lastName, 'Stegaru')

email = findTestObject('NewManuscript/manuscriptAuthorsDetails/email')
WebUI.setText(email, 'vlad.stegaru+newuser1@thinslices.com')

affiliation = findTestObject('NewManuscript/manuscriptAuthorsDetails/affiliation')
WebUI.setText(affiliation, 'University')

country = findTestObject('NewManuscript/manuscriptAuthorsDetails/country')
WebUI.click(country)

countryOption = findTestObject('NewManuscript/manuscriptAuthorsDetails/countryOption')
WebUI.click(countryOption)

SaveButton = findTestObject('NewManuscript/manuscriptAuthorsDetails/Save')
WebUI.click(SaveButton)

submittingAuthor = findTestObject("NewManuscript/manuscriptAuthorsDetails/submittingAuthor")
WebUI.waitForElementPresent(submittingAuthor, 10)

noButton = findTestObject('NewManuscript/manuscriptAuthorsDetails/no')
WebUI.click(noButton)
WebUI.waitForElementPresent(noButton, 10)

NextButton = findTestObject('NewManuscript/manuscriptAuthorsDetails/Next')
WebUI.waitForElementVisible(NextButton, 10)
WebUI.click(NextButton)

attachManuscript = findTestObject('NewManuscript/manuscriptFilesUpload/attachManuscript')
document = findTestObject("NewManuscript/manuscriptFilesUpload/document")
WebUI.uploadFile(attachManuscript, '/Users/vladstegaru/Documents/Hindawi/attachements/document.pdf')
WebUI.waitForElementPresent(document, 10)

submitManuscript = findTestObject('NewManuscript/manuscriptFilesUpload/submitManuscript')
WebUI.click(submitManuscript)
WebUI.waitForElementVisible(submitManuscript, 10)

goToDashboard = findTestObject('Resume/goToDashboard')
WebUI.waitForElementPresent(goToDashboard, 10)
WebUI.click(goToDashboard)
WebUI.waitForPageLoad(5)

//WebUI.closeBrowser()

